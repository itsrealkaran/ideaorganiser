import { Link } from "react-router-dom";
import { useContext } from "react";
import Logo2 from "../../img/logo2.png";
import Line from "../../img/line.png";
import { IoIosArrowBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { BsBookmark } from "react-icons/bs";
import { DataContext } from "../../DataContext";
import Search from "../../img/Search.png";
import { useState } from "react";

const PostsNav = ({ setModalVisible, posts, setPosts}) => {
  const [data, setData] = useContext(DataContext);

  //extract query from url
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");

  //handles bookmark of board
  const handleBookmark = () => {
    const updatedData = [...data];
    const selectedItem = updatedData[query];
    selectedItem.isBookmarked = !selectedItem.isBookmarked;
    setData(updatedData);
  }

  const [searchValue, setSearchValue] = useState("");
  const [postData, setPostData] = useState(posts);

  //on change function of search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    console.log(value.length);
    // filters the boards visible
    if(value.length){

      const filteredPosts = value
        ? postData.filter((post) =>
            post.name.toLowerCase().includes(value.toLowerCase())
          )
        : posts;
        setPosts(filteredPosts);
    }
    else{
      setPosts(postData);
    }
    
  };

  return (
    <nav
      className="navbar  navbar-light"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* back button */}
      <div
        className=""
        style={{
          marginLeft: "2%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          flex: "1",
          width: "100%",
          alignItems: "center",
          padding: "16px"
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
          <Link to="/">
            <IoIosArrowBack
              style={{ color: "#717171", fontSize: "30px" }}
            />
          </Link>
          <img
              src={Logo2}
              className="img-fluid"
              alt="Logo"
              style={{maxHeight: "40px"}}
            />
          
            <h5 style={{
              fontFamily: "Arial, Sans-serif",
              fontWeight: "700",
              fontSize: "20px",
              fontWeight: "bolder",
              color: "#717171",
              marginTop: "8px",
              marginLeft: "10px",
              whiteSpace: 'nowrap',
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth:"100px"}} className="d-inline d-md-none d-lg-none"> {data[query].name}</h5>
            <h5 style={{
              fontFamily: "Arial, Sans-serif",
              fontWeight: "700",
              fontSize: "20px",
              fontWeight: "bolder",
              color: "#717171",
              marginTop: "8px",
              marginLeft: "10px",
              whiteSpace: 'nowrap',
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth:"200px"}} className="d-none d-md-inline d-lg-none"> {data[query].name}</h5>
            <h5
            style={{
              fontFamily: "Arial, Sans-serif",
              fontWeight: "700",
              fontSize: "20px",
              fontWeight: "bolder",
              color: "#717171",
              marginTop: "8px",
              marginLeft: "10px",
              whiteSpace: 'nowrap',
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            className="d-none d-lg-inline"
          >
            {data[query].name}
          </h5>
        </div>
        <div style={{display: "flex", alignItems: "center", marginLeft: "4%"}}>
          {/* search bar */}
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
          <img
            src={Line}
            style={{
              paddingLeft: "17px",
              paddingRight: "5px",
            }}
            height="27"
            className="d-inline-block align-top"
            alt="line"
          />
          <button style={{ border: "0px", backgroundColor: "#FFFFFF" }}>
            <BsBookmark
              style={{
                color: "#717171",
                fontSize: "30px",
                padding: "4px",
                color: data[query].isBookmarked ? "#F2BE22" : "#000000",
              }}
              onClick={handleBookmark}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PostsNav;
