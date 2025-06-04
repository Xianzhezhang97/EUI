import type { Meta, StoryObj } from '@storybook/react';
import { Chart, ChartProps } from '@/stories/Components/Chart/Chart';

const meta: Meta<typeof Chart> = {
  title: 'UI/Components/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['bar', 'line', 'area', 'pie', 'radar', 'radial'],
      description: 'Type of chart to display',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the chart',
    },
    color: {
      control: 'color',
      description: 'Primary color for the chart (single series or fallback)',
    },
    multiColor: {
      control: 'boolean',
      description: 'Use multiple colors for data series (e.g., for BarChart)',
    },
    title: {
      control: 'text',
      description: 'Chart title',
    },
    data: {
      description: 'Data to display in the chart',
    },
    xKey: {
      control: 'text',
      description: 'Key for X-axis data',
    },
    yKey: {
      control: 'text',
      description: 'Key for Y-axis data (for single series or primary series)',
    },
    yKeys: {
      control: 'object',
      description:
        'Array of keys for Y-axis data (for multi-series AreaChart or RadarChart)',
    },
    interpolationType: {
      control: 'select',
      options: ['monotone', 'linear', 'step', 'stepBefore', 'stepAfter'],
      description:
        'Interpolation type for AreaChart (monotone, linear, step, etc.)',
      if: { arg: 'type', eq: 'area' },
    },
    showLegend: {
      control: 'boolean',
      description:
        'Show legend for the chart (applicable to Area, Radar, Radial, Pie)',
    },
    stacked: {
      control: 'boolean',
      description: 'Enable stacking for multi-series AreaChart',
      if: { arg: 'type', eq: 'area' },
    },
    stackOffset: {
      control: 'select',
      options: ['none', 'expand', 'silhouette', 'wiggle'],
      description:
        'Stack offset type for AreaChart (e.g., expand for 100% stacked)',
      if: { arg: 'type', eq: 'area' },
    },
    showDots: {
      control: 'radio',
      options: ['hidden', 'visible'],
      description:
        'Show dots on AreaChart/LineChart (hidden, visible, or custom object). For RadarChart, use radarShowDots.',
    },
    gradientFill: {
      control: 'boolean',
      description: 'Enable gradient fill for AreaChart',
      if: { arg: 'type', eq: 'area' },
    },
    showGridX: {
      control: 'boolean',
      description: 'Show X-axis grid lines',
    },
    showGridY: {
      control: 'boolean',
      description: 'Show Y-axis grid lines',
    },
    nameKey: {
      control: 'text',
      description:
        'Key for item name/label (e.g., for Pie/Radial charts, defaults to xKey when not specified)',
    },
    valueKey: {
      control: 'text',
      description:
        'Key for item value (e.g., for Pie/Radial charts, defaults to yKey when not specified)',
    },
    radialStartAngle: {
      control: { type: 'number', min: -360, max: 360 },
      description: 'Start angle for RadialChart',
      if: { arg: 'type', eq: 'radial' },
    },
    radialEndAngle: {
      control: { type: 'number', min: -360, max: 360 },
      description: 'End angle for RadialChart',
      if: { arg: 'type', eq: 'radial' },
    },
    radialInnerRadius: {
      control: 'text',
      description: "Inner radius for RadialChart (e.g., '20%' or 50)",
      if: { arg: 'type', eq: 'radial' },
    },
    radialOuterRadius: {
      control: 'text',
      description: "Outer radius for RadialChart (e.g., '80%' or 100)",
      if: { arg: 'type', eq: 'radial' },
    },
    radialBarSize: {
      control: 'number',
      description: 'Bar size (thickness) for RadialChart',
      if: { arg: 'type', eq: 'radial' },
    },
    radialHoverAnimationDuration: {
      control: { type: 'number', min: 0, step: 50 },
      description: 'Duration for hover animation on RadialChart segments (ms)',
      if: { arg: 'type', eq: 'radial' },
    },
    radarGridType: {
      control: 'select',
      options: ['polygon', 'circle'],
      description: 'Grid type for RadarChart',
      if: { arg: 'type', eq: 'radar' },
    },
    radarShowDots: {
      control: 'boolean',
      description:
        'Show dots on RadarChart (true for default dots, false for no dots, or pass object via props for custom)',
      if: { arg: 'type', eq: 'radar' },
    },
    radarActiveDot: {
      control: 'object',
      description:
        'Custom active dot configuration for RadarChart (e.g., { r: 8 })',
      if: { arg: 'type', eq: 'radar' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

// Sample data for our charts
const barData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const lineData = [
  { month: 'Jan', revenue: 1000 },
  { month: 'Feb', revenue: 1500 },
  { month: 'Mar', revenue: 1200 },
  { month: 'Apr', revenue: 1800 },
  { month: 'May', revenue: 2000 },
  { month: 'Jun', revenue: 2500 },
];

// Multi-series data
const multiLineData = [
  { month: 'Jan', sales: 1000, profit: 500, customers: 300 },
  { month: 'Feb', sales: 1500, profit: 700, customers: 400 },
  { month: 'Mar', sales: 1200, profit: 600, customers: 500 },
  { month: 'Apr', sales: 1800, profit: 900, customers: 600 },
  { month: 'May', sales: 2000, profit: 1000, customers: 700 },
  { month: 'Jun', sales: 2500, profit: 1200, customers: 800 },
];

const areaData = [
  { date: '2023-01', users: 4000 },
  { date: '2023-02', users: 3000 },
  { date: '2023-03', users: 5000 },
  { date: '2023-04', users: 7000 },
  { date: '2023-05', users: 6000 },
  { date: '2023-06', users: 8000 },
];

// Multi-series area data
const multiAreaData = [
  { date: '2023-01', desktop: 2000, mobile: 1500, tablet: 500 },
  { date: '2023-02', desktop: 1800, mobile: 2000, tablet: 600 },
  { date: '2023-03', desktop: 2200, mobile: 2500, tablet: 700 },
  { date: '2023-04', desktop: 2500, mobile: 3000, tablet: 800 },
  { date: '2023-05', desktop: 2300, mobile: 3500, tablet: 900 },
  { date: '2023-06', desktop: 2800, mobile: 4000, tablet: 1000 },
];

const pieData = [
  { category: 'Mobile', sales: 4000 },
  { category: 'Desktop', sales: 3000 },
  { category: 'Tablet', sales: 2000 },
  { category: 'Other', sales: 1000 },
];

// Radar chart data
const radarData = [
  { subject: 'Math', score: 80 },
  { subject: 'Chinese', score: 90 },
  { subject: 'English', score: 70 },
  { subject: 'Physics', score: 85 },
  { subject: 'Chemistry', score: 75 },
  { subject: 'Biology', score: 80 },
];

// Multi-series Radar chart data
const multiSeriesRadarData = [
  { subject: 'Math', studentA: 120, studentB: 110, studentC: 100 },
  { subject: 'Chinese', studentA: 98, studentB: 130, studentC: 85 },
  { subject: 'English', studentA: 86, studentB: 130, studentC: 90 },
  { subject: 'Geography', studentA: 99, studentB: 100, studentC: 70 },
  { subject: 'Physics', studentA: 85, studentB: 90, studentC: 110 },
  { subject: 'History', studentA: 65, studentB: 85, studentC: 120 },
];

const radialData = [
  { name: 'Electronics', value: 400, fill: '#8884d8' },
  { name: 'Clothing', value: 300, fill: '#83a6ed' },
  { name: 'Groceries', value: 200, fill: '#8dd1e1' },
  { name: 'Books', value: 278, fill: '#82ca9d' },
  { name: 'Home Goods', value: 189, fill: '#a4de6c' },
  { name: 'Others', value: 239, fill: '#d0ed57' },
];

const radialDataSimple = [
  { name: 'A', value: 75 },
  { name: 'B', value: 60 },
  { name: 'C', value: 45 },
  { name: 'D', value: 30 },
];

// Bar Chart examples
export const BarChartExample: Story = {
  args: {
    type: 'bar',
    data: barData,
    xKey: 'name',
    yKey: 'value',
    title: 'Monthly Performance',
    multiColor: true,
    showGridX: true,
    showGridY: false,
    size: 'md',
    color: 'rgba(0, 0, 0, 0)',
  },
};

export const BarChartCustomColor: Story = {
  args: {
    ...BarChartExample.args,
    color: '#10b981', // Green
    title: 'Monthly Performance (Custom Color)',
    multiColor: false,
  },
};

export const BarChartLarge: Story = {
  args: {
    ...BarChartExample.args,
    size: 'lg',
    title: 'Monthly Performance (Large)',
    color: '#0be03d',
  },
};

// Line Chart examples
export const LineChartExample: Story = {
  args: {
    type: 'line',
    data: lineData,
    xKey: 'month',
    yKey: 'revenue',
    title: 'Monthly Revenue',
  },
};

export const LineChartMultiSeries: Story = {
  args: {
    type: 'line',
    data: multiLineData,
    xKey: 'month',
    yKey: 'sales',
    title: 'Sales, Profit & Customers',
    multiColor: true,
    color: '#b90f0f',
    size: 'md',
    className: '',
    showGridX: false,
    showGridY: false,
  },
};

export const LineChartCustomColor: Story = {
  args: {
    ...LineChartExample.args,
    color: '#ec4899', // Pink
    title: 'Monthly Revenue (Custom Color)',
  },
};

export const LineChartSmall: Story = {
  args: {
    ...LineChartExample.args,
    size: 'sm',
    title: 'Monthly Revenue (Small)',
  },
};

// Area Chart examples
export const AreaChartExample: Story = {
  args: {
    type: 'area',
    data: areaData,
    xKey: 'date',
    yKey: 'users',
    title: 'User Growth (Monotone)',
    color: '#3b82f6',
    showGridY: true,
  },
};

export const AreaChartLinear: Story = {
  args: {
    type: 'area',
    data: areaData,
    xKey: 'date',
    yKey: 'users',
    title: 'User Growth (Linear)',
    color: '#10b981',
    interpolationType: 'linear',
    showGridY: true,
  },
};

export const AreaChartStep: Story = {
  args: {
    type: 'area',
    data: areaData,
    xKey: 'date',
    yKey: 'users',
    title: 'User Growth (Step)',
    color: '#f59e0b',
    interpolationType: 'step',
    showGridY: true,
  },
};

export const AreaChartMultiSeriesWithLegend: Story = {
  args: {
    type: 'area',
    data: multiAreaData,
    xKey: 'date',
    yKeys: ['desktop', 'mobile', 'tablet'],
    title: 'Device Usage (Multi-Series with Legend)',
    showLegend: true,
    stacked: true,
    showGridY: true,
  },
};

export const AreaChartStackedExpanded: Story = {
  args: {
    type: 'area',
    data: multiAreaData,
    xKey: 'date',
    yKeys: ['desktop', 'mobile', 'tablet'],
    title: 'Device Usage (Stacked Expanded 100%)',
    showLegend: true,
    stacked: true,
    stackOffset: 'expand',
    showGridY: true,
  },
};

export const AreaChartGradient: Story = {
  args: {
    type: 'area',
    data: areaData,
    xKey: 'date',
    yKey: 'users',
    title: 'User Growth (Gradient Fill)',
    color: '#8b5cf6',
    gradientFill: true,
    showGridY: true,
  },
};

export const AreaChartWithVisibleDots: Story = {
  args: {
    type: 'area',
    data: areaData,
    xKey: 'date',
    yKey: 'users',
    title: 'User Growth (Visible Dots)',
    color: '#ec4899',
    showDots: 'visible',
    showGridY: true,
  },
};

export const AreaChartMultiSeriesStackedWithDots: Story = {
  args: {
    type: 'area',
    data: multiAreaData,
    xKey: 'date',
    yKeys: ['desktop', 'mobile', 'tablet'],
    title: 'Device Usage (Stacked with Dots)',
    showLegend: true,
    stacked: true,
    showDots: 'visible',
    showGridY: true,
  },
};

// Pie Chart examples
export const PieChartExample: Story = {
  args: {
    type: 'pie',
    data: pieData,
    nameKey: 'category',
    valueKey: 'sales',
    title: 'Sales by Platform',
    showLegend: true,
  },
};

export const PieChartMultiColor: Story = {
  args: {
    ...PieChartExample.args,
    title: 'Sales by Platform (MultiColor)',
  },
};

// Radar Chart examples
export const RadarChartExample: Story = {
  args: {
    type: 'radar',
    data: radarData, // Single series data
    nameKey: 'subject',
    valueKey: 'score', // yKey will be used as seriesKey if yKeys not provided
    title: 'Student Performance (Single Series)',
    color: '#8b5cf6', // This color will be used for the single radar series
    showLegend: false,
    radarShowDots: true,
    radarGridType: 'polygon',
  },
};

export const RadarChartMultiSeries: Story = {
  args: {
    type: 'radar',
    data: multiSeriesRadarData,
    nameKey: 'subject',
    yKeys: ['studentA', 'studentB', 'studentC'],
    title: 'Student Comparison (Multi-Series)',
    showLegend: true,
    radarGridType: 'circle',
    radarShowDots: true,
  },
};

export const RadarChartNoDots: Story = {
  args: {
    ...RadarChartExample.args,
    title: 'Student Performance (No Dots)',
    radarShowDots: false,
    color: '#10b981',
  },
};

export const RadarChartCustomActiveDot: Story = {
  args: {
    ...RadarChartMultiSeries.args,
    title: 'Student Comparison (Custom Active Dot)',
    showLegend: true,
    radarActiveDot: { r: 8, fill: '#ff0000', stroke: '#cc0000' },
  },
};

// Radial Chart examples
export const RadialChartExample: Story = {
  args: {
    type: 'radial',
    data: radialData,
    nameKey: 'name',
    valueKey: 'value',
    title: 'Category Breakdown (Radial)',
    showLegend: true,
    size: 'md',
  },
};

export const RadialChartSimple: Story = {
  args: {
    type: 'radial',
    data: radialDataSimple,
    nameKey: 'name',
    valueKey: 'value',
    title: 'Progress Overview (Radial Simple)',
    showLegend: false,
    radialInnerRadius: '50%',
    radialOuterRadius: '100%',
    radialBarSize: 20,
    radialStartAngle: 90,
    radialEndAngle: -270,
    size: 'sm',
  },
};
