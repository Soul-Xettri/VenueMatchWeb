import { useWindowScroll } from "@mantine/hooks";
import { Group } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export function ScrollToTop() {
  const [, scrollTo] = useWindowScroll();

  return (
    <Group className="scrollToTop">
      <div
        className="form-section "
        style={{ padding: 0, background: "transparent" }}
      >
        <div className="banner-btn discover-btn-banner">
          <button
            onClick={() => scrollTo({ y: 0 })}
            style={{ borderRadius: "100%",padding:"20px" }}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>
    </Group>
  );
}
