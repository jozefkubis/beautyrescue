type ToggleProps = {
  isOn: boolean;
  setIsOn: (value: boolean) => void;
};

export default function Toggle({ isOn, setIsOn }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => setIsOn(!isOn)} // prepnutie stavu
      title={isOn ? "Ukázať" : "Skryť"}
      className={`w-10 h-6 flex items-center rounded-full p-1 transition
        ${isOn ? "bg-goldLight" : "bg-gray-400"}`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition
          ${isOn ? "translate-x-4" : "translate-x-0"}`}
      />
    </button>
  );
}
