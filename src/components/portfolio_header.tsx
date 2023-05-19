import { HashLink } from "react-router-hash-link";

const scrollWithOffset = (el: HTMLElement, offset: number) => {
  const elementPosition = el.offsetTop - offset;
  // const nav = document.getElementsByClassName("portfolioheader")[0] as HTMLElement;
  // nav['offsetTop'] += (el.offsetTop - offset);
  window.scroll({
    top: elementPosition,
    left: 0,
    behavior: "auto"
});    
}

const PortfolioHeader = () => {
  const offset = window.innerWidth > 650 ? 178 : 90;

  return (
    <div className="portfolioheader">
      <div className="hashlink">
        <HashLink to="#works" scroll={(el) => scrollWithOffset(el, offset)}>Works</HashLink>

      </div>
      <div className="hashlink">
        <HashLink to="#soundinstallations" scroll={(el) => scrollWithOffset(el, offset)}>Sound Installations</HashLink> 
      </div>
    </div>
    )
}

export default PortfolioHeader;
