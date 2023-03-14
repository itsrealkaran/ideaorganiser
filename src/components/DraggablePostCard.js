// DraggablePostCard.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import PostCard from './PostCard';

const DraggablePostCard = ({ id, index, moveCard, ...props }) => {
  const [, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))}>
      <PostCard {...props} />
    </div>
  );
};

export default DraggablePostCard;
