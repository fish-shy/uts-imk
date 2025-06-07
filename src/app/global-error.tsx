"use client";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html lang="en">
      <head>
        <title>Global Error</title>
      </head>
      <body className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">An error occurred</h1>
          <p className="mt-4 text-gray-700">{error.message}</p>
        </div>
      </body>
    </html>
  );
}