import React, { useState } from "react";
import Search from "../../img/Search.png";
import Logo from "../../img/logo.png";
import UnionLogo from "../../img/Union.png";
import { AiOutlinePlus } from "react-icons/ai";

const HomeNav = ({ setModalVisible, boards, setBoards }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [boardData, setBoardData] = useState(boards);

  //on change function of search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    console.log(value.length);
    // filters the boards visible
    if(value.length){

      const filteredBoards = value
        ? boardData.filter((board) =>
            board.name.toLowerCase().includes(value.toLowerCase())
          )
        : boards;
        setBoards(filteredBoards);
    }
    else{
      setBoards(boardData);
    }

  };

  return (
    // logo
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#FFFFFF", borderBottom: "2px solid #EBEBEB"}}
    >
      <div
        style={{display: "flex", flex: "1", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <a className="navbar-brand" style={{ paddingLeft: "4%", flex: "5"}}>
          <img
            src={Logo}
            className="img-fluid"
            alt="Logo"
            style={{filter: "invert(100%)", maxHeight: "60px"}}
          />
        </a>
        <div
          style={{display: "flex", flex: "3", paddingRight:"4%", alignItems: "center"}}>
          {/* search bar */}
          <div style={{flex: "3"}}>
          <form
            className="nav-item d-flex "
            
          >
            <div className="input-group" style={{flexWrap: "nowrap"}}>
              <span
                style={{ backgroundColor: "#FFFFFF" }}
                className="input-group-text"
              >
                <img
                  src={Search}
                  height="15"
                  className="d-inline-block align-top"
                  alt="Search"
                />
              </span>
              <input
                style={{ backgroundColor: "#FFFFFF" }}
                className="form-control"
                type="search"
                placeholder="Search.."
                aria-label="Search"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          </form>
          </div>

          {/* create board button */}
          <div style={{flex:"1"}}><button
            className={`nav-item btn ms-5`}
            style={{ backgroundColor: "#D33852", color: "white", whiteSpace: "nowrap"}}
            onClick={() => setModalVisible(true)}
          >
            <AiOutlinePlus
              className="d-inline-block align-left me-1"
              style={{ paddingBottom: "3px", fontSize: "23px" }}
            />
            <span className="d-none d-lg-inline">New Board</span>
          </button></div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
