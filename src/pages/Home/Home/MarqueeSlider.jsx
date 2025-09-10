// components/MarqueeSlider/MarqueeSlider.jsx
const MarqueeSlider = () => {
  const messages = [
    "🩸 Donate blood, save a life.",
    "❤️ Be a hero today, give blood.",
    "🕐 Every 2 seconds, someone needs blood.",
    "🌍 Your blood can give someone another chance at life.",
    "💉 Safe blood saves lives!",
    "🩸 Donate blood, save a life.",
    "❤️ Be a hero today, give blood.",
    "🕐 Every 2 seconds, someone needs blood.",
    "🌍 Your blood can give someone another chance at life.",
    "💉 Safe blood saves lives!",
  ];

  return (
    <div className="overflow-hidden bg-primaryColor text-white py-3">
      <div className="whitespace-nowrap animate-marquee ">
        {messages.map((msg, index) => (
          <span key={index} className="mx-10 inline-block text-lg font-medium">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSlider;
