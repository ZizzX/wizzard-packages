import { useState, useEffect, type ReactNode } from "react";

interface DeferredListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  chunkSize?: number;
  delay?: number;
  className?: string;
}

/**
 * DeferredList renders items in chunks to keep the main thread free.
 * Useful for mounting hundreds of complex components at once.
 */
export function DeferredList<T>({
  items,
  renderItem,
  chunkSize = 10,
  delay = 16, // roughly 1 frame
  className,
}: DeferredListProps<T>) {
  const [visibleCount, setVisibleCount] = useState(chunkSize);
  const [prevItems, setPrevItems] = useState(items);

  // Reset if items changed
  if (items !== prevItems) {
    setPrevItems(items);
    setVisibleCount(chunkSize);
  }

  useEffect(() => {
    if (visibleCount < items.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + chunkSize, items.length));
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, items.length, chunkSize, delay, items]);

  return (
    <div className={className}>
      {items
        .slice(0, visibleCount)
        .map((item, index) => renderItem(item, index))}
    </div>
  );
}
