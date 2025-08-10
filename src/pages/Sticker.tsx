import data from "../data/cards.json";

function Sticker() {
  return (
    <div className="gallery">
      {data.stickers.map((sticker, idx) => (
        <div key={idx} className="gallery-item">
          <div className="gallery-img">
            <img
            src={`${process.env.PUBLIC_URL}/${sticker.file}`} // ✅ leading slash because public folder
            alt={sticker.name}
          />
          </div>
          <p className="gallery-name">{sticker.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Sticker;