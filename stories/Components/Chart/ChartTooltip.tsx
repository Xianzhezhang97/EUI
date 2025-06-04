import React from 'react';

interface ChartTooltipPropsItem {
  // name: string; // We will now extract the name from item.payload using nameKey
  value: number | string;
  color?: string; // Recharts own color for the series/item
  stroke?: string;
  fill?: string; // Direct fill on the payload item itself
  payload?: {
    // This is the original data object for the item
    fill?: string; // Fill color from the original data object
    [key: string]: any; // To allow access via a string nameKey
  };
  // Add other payload properties if needed
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPropsItem[];
  label?: string | number; // This is the default label from Recharts (e.g., x-axis category)
  title?: string; // New optional prop for the chart's main title
  nameKey?: string; // New prop to specify the key for the item name in item.payload
  // formatter?: (value: number | string, name: string, item: any, index: number) => React.ReactNode;
  // labelFormatter?: (label: string | number) => React.ReactNode;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label, // Recharts default label
  title, // Chart's main title from component props
  nameKey = 'name', // Default to 'name' if not provided
}) => {
  if (active && payload && payload.length) {
    // Use the chart's title if provided, otherwise don't show a main label section
    // (or show the Recharts label if that's preferred as a fallback when no title)
    const displayLabel = title ? title : null; // If title exists, use it. Else, no main label.
    // Alternative: const displayLabel = title ? title : label; // If you want Recharts label as fallback

    return (
      <div className='rounded-lg border bg-background bg-white/70 backdrop-blur-sm card-md text-sm shadow-lg'>
        {displayLabel && (
          <div className='mb-1.5 font-medium text-foreground'>
            {displayLabel}
          </div>
        )}
        <div
          className={`space-y-2 ${
            !displayLabel && payload.length === 1 ? 'pt-1.5' : ''
          }`}
        >
          {' '}
          {/* Add padding if no title and single item */}
          {payload.map((item, index) => {
            // Determine the best color source
            const itemColor =
              item.payload?.fill || // 1. Color from the original data object's 'fill' property
              item.fill || // 2. Direct 'fill' on the payload item
              item.color || // 3. Recharts provided 'color' (often series color)
              item.stroke || // 4. Fallback to stroke
              '#8884d8'; // 5. Default color

            // Extract the item's display name from its original payload using nameKey
            const itemName =
              item.payload && item.payload[nameKey] != null
                ? String(item.payload[nameKey])
                : '';

            return (
              <div
                key={index}
                className='flex items-center gap-2'
              >
                <span
                  className='size-sm shrink-0 rounded-[3px]'
                  style={{ backgroundColor: itemColor }}
                />
                <div className='flex flex-1 items-center justify-between w-[100px]'>
                  {/* Conditionally render the item name (label) */}
                  {itemName && itemName.trim() !== '' && (
                    <span className='text-muted-foreground text-xs'>
                      {itemName}
                    </span>
                  )}
                  {/* Ensure value is always shown, adjust spacing if name is absent */}
                  <span
                    className={`font-medium text-xs text-foreground ${
                      !itemName || itemName.trim() === '' ? 'ml-auto' : ''
                    }`}
                  >
                    {typeof item.value === 'number'
                      ? item.value.toLocaleString()
                      : item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

ChartTooltip.displayName = 'ChartTooltip';
export default ChartTooltip;
