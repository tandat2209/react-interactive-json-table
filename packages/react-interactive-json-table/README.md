# React Interactive JSON Table

React Interactive JSON Table is a powerful and flexible React component that allows you to convert JSON data into editable tables and vice versa.

## Demo

Here's a live demo of the React Interactive JSON Table component:

[Edit React Interactive JSON Table Demo](https://json2tableconverter.vercel.app/)

## Features

- Convert JSON objects and arrays into interactive tables
- Edit table cells in-place
- Automatically update the underlying JSON data structure
- Support for nested objects and arrays
- TypeScript support

## Installation

To install the package, run the following command:

```bash
npm install react-interactive-json-table
```

## Usage

To use the component, import it into your React application and pass the JSON data to the `JsonTable` component.

```tsx
import React, { useState } from 'react';
import JsonTable from 'react-interactive-json-table';

function App() {
  const [data, setData] = useState({
    name: "John Doe",
    age: 30,
    hobbies: ["reading", "swimming"]
  });
  return (
    <JsonTable
      data={data}
      onDataUpdate={(updatedData) => setData(updatedData)}
    />
  );
}
```

## Props

The `JsonTable` component accepts the following props:

- `data`: The JSON data to be displayed in the table.
- `onDataUpdate`: A callback function that is called when the user updates the table data. The function receives the updated data as an argument.
