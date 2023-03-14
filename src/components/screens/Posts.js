import React, { useState, useContext, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggablePostCard from "../DraggablePostCard"; // Assuming DraggablePostCard is in the same directory
import PostsNav from "../navBars/PostsNav";
import { AiOutlinePlus } from "react-icons/ai";
import NoItem from "../NoItem";
import PostModal from "../modals/PostModal";
import { DataContext } from "../../DataContext";

const Posts = () => {
  const [postsEmpty, setPostsEmpty] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useContext(DataContext);

  // extracting query from url
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");

  // check if there are any posts
  useEffect(() => {
    if (!data[query].posts.length) setPostsEmpty(true);
    else setPostsEmpty(false);
  }, [data]);

  // handle card movement
  const moveCard = (dragIndex, hoverIndex) => {
    const updatedData = [...data];
    const [draggedCard] = updatedData[query].posts.splice(dragIndex, 1);
    updatedData[query].posts.splice(hoverIndex, 0, draggedCard);
    setData(updatedData);
  };

  return (
    <div style={{ backgroundColor: data[query].color, minHeight: "100vh" }}>
      <PostsNav />
      {/* header of posts page */}
      <div style={{ paddingLeft: "5%", paddingTop: "2%", paddingRight: "5%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {postsEmpty && (
              <h2
                style={{ fontFamily: "Arial, Sans-serif", fontWeight: "700" }}
              >
                Your Posts
              </h2>
            )}
          </div>
          <button
            className={`nav-item btn ms-5`}
            style={{ backgroundColor: "#D33852", color: "white" }}
            onClick={() => {
              setModalVisible(true);
            }}
          >
            <AiOutlinePlus
              className="d-inline-block align-left me-1"
              style={{ paddingBottom: "3px", fontSize: "23px" }}
            />
            <span className="d-none d-lg-inline">Create New Post</span>
          </button>
        </div>
        {/* content of posts page */}
        <DndProvider backend={HTML5Backend}>
        <div
          style={{...(!postsEmpty && {
            display: "flex",
            flexWrap: "wrap",
            columnGap: "70px",
            padding: "2%",
          })}}
        >
          {postsEmpty ? (
            <div >
            <NoItem style={{
              display: "flex", flex: "1"}}/></div>
          ) : (
            data[query].posts.map(({ id, ...post }, index) => (
          <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: "70px",
            padding: "2%",
          }}
          ><DraggablePostCard
                key={id}
                id={id}
                index={index}
                moveCard={moveCard}
                {...post}
              /></div>
            ))
          )}
          </div>
      </DndProvider>
      <PostModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={data}
        setData={setData}
        query={query}
        operation={"add"}
        subject={""}
        comment={""}
        image={null}
        id={""}
      />
    </div>
    </div>
  );
};

export default Posts;
