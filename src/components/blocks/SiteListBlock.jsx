import SiteCard from "../cards/SiteCards.jsx";

const SiteListBlock = ({ sites, onRemoved }) => {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {sites.map((site) => (
        <SiteCard site={site} key={site.id} onRemove={onRemoved} />
      ))}
    </ul>
  );
};

export default SiteListBlock;
