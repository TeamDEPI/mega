import Dropdown from "react-bootstrap/Dropdown";

function BasicExample() {
  return (
    <Dropdown>
      <Dropdown.Toggle
        style={{
          color: "#458FF6",
          fontWeight: "850",
          border: "none",
          fontSize: "20px",
          backgroundColor: "white",
        }}
        id="dropdown-basic"
      >
        English
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Arabic</Dropdown.Item>
        <Dropdown.Item href="#/action-2">German</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;
