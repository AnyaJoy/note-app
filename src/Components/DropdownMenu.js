import { useMemo, useState } from "react";  
import { DropDownList } from "@progress/kendo-react-dropdowns";  
import NoteList from "./NoteList";
  
// Dropdown categories  
const categories = ["all", "recipe", "video", "article"];  
  
  
// Results data filtered using categories  
const data = [  
  {  
    id: 1,  
    label: "Best Ramen ever",  
    type: "recipe",  
  },  
  {  
    id: 2,  
    label: "Top 10 Mexican dishes",  
    type: "article",  
  },  
  {  
    id: 3,  
    label: "How to prepare a whole roast chicken",  
    type: "video",  
  },  
  {  
    id: 4,  
    label: "Chilli Chicken Gnocchi",  
    type: "recipe",  
  },  
  {  
    id: 5,  
    label: "Best 5 ice desserts for hot summer",  
    type: "article",  
  },  
];  
  
export const RecipeDropDownList = (props) => {  
    const { noteData, setNoteData, title, setTitle, note, setNote } = props;

  // Store currently selected category  
  const [category, setCategory] = useState();  
  
  // Memoized results. Will re-evaluate any time selected  
  // category changes  
  const filteredData = useMemo(() => {  
    // if (!category || category === "all") return data;  
  
    return data.filter(item => item.type === category);  
}, [category]);  
  

  return (
    <>
    {!category && <NoteList 
    noteData={noteData}
    setNoteData={setNoteData}
    title={title}
    setTitle={setTitle}
    note={note}
    setNote={setNote}
    />}
    </>
  );
};