import { closestCenter, DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import './App.css';

function SortableComponent ({
  id,
  name
}) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return <p style={style} ref={setNodeRef} {...attributes} {...listeners}>{name}</p>
}

function App() {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Manoj"
    },
    {
      id: "2",
      name: "John"
    }
  ]);

  const sensors = [useSensor(PointerSensor)];

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  
  return (
    <div className="App">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {
            items.map(item => <SortableComponent {...item} key={item.id} />)
          }
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default App;
