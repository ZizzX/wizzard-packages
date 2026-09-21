---
title: Concepts and glossary
description: The four objects a wizard is made of, the two places your own code plugs into them, and one definition per word the rest of the documentation uses.
---

Every page here is written in the same handful of words, and they are not interchangeable: a
flow is not a wizard, state is not data, and a registry is not a list of sub-flows. This page
defines each one once, and the glossary at the end says where it is explained in full.

## One idea

A flow is data. The order of the steps, the conditions that include them, the guards that
refuse them and the validators that check them are fields of a plain JSON object - no
functions, no class instances, nothing that `JSON.stringify` loses. Everything that cannot be
serialized is addressed by name instead, and the names are resolved at runtime.

That single constraint is what the rest follows from. A definition that is data can be sent
from a server, stored in a database, drawn as a graph, diffed between two versions, and
replayed step for step. A definition that held your `onNext` callback could do none of it.

## The four objects

**The definition** is the flow: `{ id, version, order, steps, policy }`, built by
`defineFlow()` or handed to you by a backend. It describes every run of the wizard and belongs
to none of them. Nothing mutates it while a wizard runs.

**The wizard** is the engine holding one run of that definition - what `createWizard()`
returns, and what a binding's provider owns. It exposes the moves (`next`, `back`, `go`),
the writes (`set`, `setCtx`), the reads (`getSnapshot`, `select`, `watch`) and the lifecycle (`start`, `reset`,
`destroy`). It is not serializable and is not meant to be.

**The state** is what the run has accumulated: where it stands, what was answered, what failed.
It is JSON as strictly as the definition is, and it holds nothing derived - `progress` and
`breadcrumbs` are computed on read, never stored, because a stored copy is a copy that can
disagree.

**The snapshot** is the part of that state worth keeping: the answers, the position, the
context, without the fields that only describe this moment - `busy`, `errors`, the revision
counter. It is what [persistence](../persistence/) writes out and what a later session decodes
back.

## Where your code plugs in

Two seams, and no others.

**The registry** is a table of named functions - resolvers - that expressions call by name. A
step's `validate: { $ref: 'needsEmail' }` is a string in the definition and a function in the
registry, and the two meet only inside the engine. That indirection is the price of a
serializable flow, and it is deliberately the single place arbitrary code can run:
`grep '\$ref'` finds every one of them.

**Plugins** wrap the moves themselves. A plugin is an object with a name and any of six hooks,
and it may observe every commit, block or redirect a move, or load the body of a step that
arrives late. Persistence and the devtools are plugins, with no privilege the one you write
does not have. [Writing a plugin](../plugins/) is the guide.

A step's `view` is a third kind of name, and the only one nothing in the library reads. It is a
string you map to a component yourself - `wizard.getFlow().steps[current].view` - which is
what lets the same definition render in React, in Vue, or in a terminal.

## What the engine tracks while it runs

A flat flow needs one word for "where am I": the current step. A flow with
[groups](../groups/) needs a stack, because a group step is a flow of its own and a repeating
group is that flow entered once per item.

So position is a stack of **frames**, one per level, each `{ flow, step, key }`, with the
current step last. The `key` is what makes a repeat survive its own list being edited: it
identifies the item, where a position would silently point at a different passenger after a
removal.

Walking that stack is the **traversal** - the code that knows how to enter a group, advance
inside it and leave it. It ships as a separate entry point, `@wizzard-packages/core/groups`,
so a flow without groups never carries it.

Each level evaluates its expressions against a **scope**: `data`, `ctx`, and inside a repeat
`loop`. The scope is computed on every read rather than stored, which is why an `input` value
piped into a group reflects a change made upstream without leaving the group and coming back.

## Glossary

Each word links to the page that explains it in full.

| Word                          | What it is                                                                                     |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| [flow](../flow/)              | the definition: a JSON object of steps, order and policy                                       |
| [step](../flow/)              | one entry in `steps`; renders a view and may carry `when`, `guards`, `validate`, `load`        |
| [group](../groups/)           | a step whose body is another flow, run once or once per item of `repeat.over`                  |
| [sub-flow](../groups/)        | a definition named in `subFlows`, so a group can reference it by string and stay serializable  |
| [expression](../expressions/) | the thirteen-operator JSON language `when`, `guards` and `repeat.over` are written in          |
| [registry](../expressions/)   | named resolvers, the functions `$ref` reaches                                                  |
| [resolver](../expressions/)   | one such function: `(args, scope) => unknown`                                                  |
| [scope](../groups/)           | what an expression may read: `data`, `ctx`, and `loop` inside a repeat                         |
| [data](../api-behaviour/)     | the answers, at whatever paths the application writes them - by convention under the step's id |
| [ctx](../api-behaviour/)      | the host's context: values you pass in, plus what a group's `input` derives for its child      |
| [state](../api-behaviour/)    | the whole runtime state - position, data, ctx, errors, counters; JSON, with nothing derived    |
| [frame](../groups/)           | one level of position: `{ flow, step, key }`; `stack` holds them, current last                 |
| [traversal](../groups/)       | the optional code that walks groups, installed as `groups`                                     |
| [policy](../navigation/)      | which jumps `go()` allows: `sequential`, `visited` (the default) or `free`                     |
| [guard](../navigation/)       | an expression that refuses entry to or exit from a step                                        |
| [plugin](../plugins/)         | an object with a name and up to six hooks around the moves                                     |
| [deferred](../async-steps/)   | a step whose body arrives from the host while the move waits                                   |
| [snapshot](../persistence/)   | the durable part of the state, written out and decoded back                                    |
| [session](../inspecting/)     | a recorded run: a flow id and the states it passed through, for replay                         |
| [selector](../api-behaviour/) | a derived read - `progress`, `breadcrumbs`, `canBack` - computed, never stored                 |

Two words are overloaded on purpose and worth keeping apart. **Snapshot** is the persistence
format in `@wizzard-packages/core/snapshot`, and also what `getSnapshot()` hands a subscriber -
the live state plus its derived reads. **Session** here is a recorded run for the inspector,
not a user's login.

## Where to go next

[Getting started](../start/) is the working quickstart. [What you can build](../showcase/)
puts branching, repeats, sub-flows, loading and persistence into one definition, to show what
the shape is capable of before you need any of it.
