import { Button } from "react-bootstrap";

const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      variant="dark"
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: "fixed",
        right: "20px",
        bottom: "30px",
        zIndex: 1000,
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        fontSize: "1.5rem",
      }}
    >
      ⬆
    </Button>
  );
};

export default BackToTopButton;
