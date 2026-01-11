import React, { useState, useEffect } from 'react';
import { useWizardContext } from '@wizzard-packages/react';
import type { WizardAction, IWizardStore } from '@wizzard-packages/core';

interface IActionLog {
  timestamp: number;
  action: WizardAction<any, any>;
  state: any;
}

export function WizardDevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'state' | 'actions' | 'errors'>('state');
  const { data, allErrors, store, ...state } = useWizardContext();
  const [logs, setLogs] = useState<IActionLog[]>([]);

  useEffect(() => {
    if (!store) return;
    const s = store as IWizardStore<any, any>;
    return s.subscribeToActions((action: WizardAction<any, any>) => {
      setLogs((prev) =>
        [
          {
            timestamp: Date.now(),
            action,
            state: store.getSnapshot(),
          },
          ...prev,
        ].slice(0, 50)
      );
    });
  }, [store]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      const hashParams = hash.includes('?') ? hash.split('?')[1] : '';
      const hashSearch = new URLSearchParams(hashParams);

      if (search.get('devtools') === 'true' || hashSearch.get('devtools') === 'true') {
        setIsOpen(true);
      }
    }
  }, []);

  if (!isOpen) {
    return (
      <button
        data-testid="wizard-devtools-toggle"
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          padding: '10px 15px',
          borderRadius: '50px',
          background: 'rgba(37, 99, 235, 0.9)',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '12px',
          backdropFilter: 'blur(5px)',
        }}
      >
        Wizard DevTools
      </button>
    );
  }

  return (
    <div
      data-testid="wizard-devtools"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '400px',
        height: '500px',
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        color: '#e2e8f0',
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.03)',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: '14px' }}>Wizard DevTools</span>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            fontSize: '18px',
          }}
        >
          &times;
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        {['state', 'actions', 'errors'].map((tab) => (
          <button
            key={tab}
            data-testid={`devtools-tab-${tab}`}
            onClick={() => setActiveTab(tab as any)}
            style={{
              flex: 1,
              padding: '10px',
              background: activeTab === tab ? 'rgba(37, 99, 235, 0.2)' : 'none',
              border: 'none',
              color: activeTab === tab ? '#60a5fa' : '#94a3b8',
              borderBottom: activeTab === tab ? '2px solid #3b82f6' : 'none',
              cursor: 'pointer',
              fontSize: '12px',
              textTransform: 'capitalize',
              fontWeight: activeTab === tab ? 600 : 400,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          fontSize: '12px',
        }}
      >
        {activeTab === 'state' && (
          <div>
            <Section title="Navigation">
              <KeyVal label="Current Step" value={state.currentStepId} />
              <KeyVal label="Index" value={state.currentStepIndex} />
              <KeyVal label="Progress" value={`${state.progress}%`} />
              <KeyVal label="Total Steps" value={state.activeStepsCount} />
              <KeyVal label="Is Loading" value={String(state.isLoading)} />
              <KeyVal label="Is Busy" value={String(state.isBusy)} />
            </Section>

            <Section title="History">
              <div style={{ color: '#94a3b8' }}>{state.history.join(' → ') || 'Empty'}</div>
            </Section>

            <Section title="Data">
              <JsonView data={data} />
            </Section>

            <Section title="Meta">
              <JsonView
                data={{
                  visited: Array.from(state.visitedSteps),
                  completed: Array.from(state.completedSteps),
                  busy: Array.from(state.busySteps),
                }}
              />
            </Section>
          </div>
        )}

        {activeTab === 'errors' && (
          <div>
            {Object.keys(allErrors).length === 0 ? (
              <div
                style={{
                  color: '#94a3b8',
                  textAlign: 'center',
                  marginTop: '20px',
                }}
              >
                No active errors
              </div>
            ) : (
              <JsonView data={allErrors} />
            )}
          </div>
        )}

        {activeTab === 'actions' && (
          <div
            data-testid="devtools-action-list"
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            {logs.length === 0 ? (
              <div
                style={{
                  color: '#94a3b8',
                  textAlign: 'center',
                  marginTop: '20px',
                }}
              >
                No actions recorded yet
              </div>
            ) : (
              logs.map((log, i) => (
                <ActionLogItem
                  key={log.timestamp + i}
                  log={log}
                  onJump={(s) =>
                    store.dispatch({
                      type: 'RESTORE_SNAPSHOT',
                      payload: { snapshot: s },
                    })
                  }
                />
              ))
            )}
          </div>
        )}
      </div>

      <div
        style={{
          padding: '8px 16px',
          fontSize: '10px',
          color: '#64748b',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.02)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>v2.1.0</span>
        <span>Strict Mode: Active</span>
      </div>
    </div>
  );
}

const ActionLogItem: React.FC<{
  log: IActionLog;
  onJump: (state: any) => void;
}> = ({ log, onJump }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const time = new Date(log.timestamp).toLocaleTimeString();

  return (
    <div
      data-testid="action-item"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div
        data-testid="action-item-header"
        onClick={() => onJump(log.state)}
        style={{
          padding: '8px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ color: '#64748b', fontSize: '10px' }}>{time}</span>
          <span data-testid="action-type" style={{ color: '#60a5fa', fontWeight: 600 }}>
            {log.action.type}
          </span>
          <button
            data-testid="jump-button"
            onClick={(e) => {
              e.stopPropagation();
              onJump(log.state);
            }}
            style={{
              padding: '2px 6px',
              fontSize: '9px',
              background: '#1e293b',
              border: '1px solid #334155',
              color: '#60a5fa',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Jump
          </button>
        </div>
        <span
          style={{
            color: '#475569',
            transform: isExpanded ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
            padding: '4px',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          ▾
        </span>
      </div>
      {isExpanded && (
        <div
          style={{
            padding: '0 12px 12px 12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <div style={{ marginTop: '8px' }}>
            <div
              style={{
                color: '#94a3b8',
                marginBottom: '4px',
                fontSize: '10px',
              }}
            >
              Payload:
            </div>
            <JsonView data={log.action.payload} />
          </div>
          <div style={{ marginTop: '8px' }}>
            <div
              style={{
                color: '#94a3b8',
                marginBottom: '4px',
                fontSize: '10px',
              }}
            >
              State after:
            </div>
            <JsonView data={log.state} />
          </div>
        </div>
      )}
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: '20px' }}>
    <h4
      style={{
        margin: '0 0 8px 0',
        color: '#3b82f6',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
    >
      {title}
    </h4>
    {children}
  </div>
);

const KeyVal: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '4px',
    }}
  >
    <span style={{ color: '#94a3b8' }}>{label}:</span>
    <span style={{ color: '#f8fafc', fontWeight: 500 }}>{value}</span>
  </div>
);

const JsonView: React.FC<{ data: any }> = ({ data }) => {
  const replacer = (_key: string, value: any) => {
    if (value instanceof Set) {
      return Array.from(value);
    }
    return value;
  };

  return (
    <pre
      style={{
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '10px',
        borderRadius: '8px',
        overflowX: 'auto',
        color: '#60a5fa',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        margin: 0,
      }}
    >
      {JSON.stringify(data, replacer, 2)}
    </pre>
  );
};
