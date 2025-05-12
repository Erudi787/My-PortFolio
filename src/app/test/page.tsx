'use client';

const TestComponent = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-[#043CAA]">Test Primary Color</h1>
      <p className="text-[#575454] mt-2">This is light text</p>
      <div className="bg-[#62B6B8] p-4 mt-2 rounded">
        <p className="text-white">This has secondary background</p>
      </div>
    </div>
  );
};

export default TestComponent;