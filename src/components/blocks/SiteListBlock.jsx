import SiteCard from "../cards/SiteCards.jsx";

const SiteListBlock = ({ sites }) => {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {sites.map((site) => (
        <SiteCard site={site} key={site.id} />
      ))}
    </ul>
  );
};

export default SiteListBlock;
