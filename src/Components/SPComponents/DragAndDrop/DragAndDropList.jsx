import React, { useState, useEffect, useContext } from "react";
import "./dragAndDropList.css";
import { UserContext } from "../../../context/UserContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function DragAndDropList({
  status,
  formData,
  editedId,
  DragDropList,
  DragDropNameList,
  onEditFPOForm,
}) {
  const { setFormListData, dragAndDropEditData } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({
    lists: {
      "list-1": {
        id: "list-1",
        title: DragDropNameList,
        items: [],
      },
      "list-2": {
        id: "list-2",
        title: "FIG Name",
        items: [],
      },
    },
    listOrder: ["list-1", "list-2"],
  });

  // let dataId = localStorage.getItem("id");

  // useEffect(() => {
  //   console.log("ashdata", data);
  //   onEditFPOForm(dataId, data.lists["list-2"].items);
  // }, [data.lists["list-2"].items.length]);

  useEffect(() => {
    if (!DragDropList) return;

    const items = DragDropList.map((farmer) => {
      if (farmer.FarmerName) {
        return {
          id: `item-${farmer.id || 0}`,
          content: farmer.FarmerName || farmer.Name || "",
          FarmerCode: farmer.FarmerCode,
          Gender: farmer.Gender,
          MobileNo: farmer.MobileNo,
          StateName: farmer.StateName,
          DistrictName: farmer.DistrictName,
          LandArea: farmer.LandArea,
          FigLeader: farmer.FarmerName,
        };
      } else {
        return {
          id: `item-${farmer.id || 0}`,
          content: farmer.Name || "",
          BlockName: farmer.BlockName,
          createdAt: farmer.createdAt,
          FarmerCount: farmer.FarmerCount,
          mobileNo: farmer.mobileNo,
          FigLeader: farmer.FigLeader,
          FigLeaderContact: farmer.FigLeaderContact,
        };
      }
    });

    setData((prevData) => ({
      ...prevData,
      lists: {
        ...prevData.lists,
        "list-1": {
          ...prevData.lists["list-1"],
          items,
        },
      },
    }));
  }, [DragDropList]);

  useEffect(() => {
    setFormListData(data?.lists["list-2"]?.items);
  }, [data]);

  useEffect(() => {
    let title = "";
    if (formData?.fig_name) {
      title = formData?.fig_name;
    } else if (formData?.lrp_name) {
      title = formData?.lrp_name;
    } else if (formData?.fpo_name) {
      title = formData?.fpo_name;
    }

    setData((prevData) => ({
      ...prevData,
      lists: {
        ...prevData.lists,
        "list-1": {
          ...prevData.lists["list-1"],
          items: [],
        },
        "list-2": {
          ...prevData.lists["list-2"],
          title: title,
          items: [],
        },
      },
    }));
  }, [formData?.district, formData?.allocated_district]);

  useEffect(() => {
    if (formData) {
      setData((prevData) => ({
        ...prevData,
        lists: {
          ...prevData.lists,
          "list-2": {
            ...prevData.lists["list-2"],
            title:
              formData.fig_name ||
              formData.lrp_name ||
              formData.fpo_name ||
              "Name",
          },
        },
      }));
    }
  }, [formData]);

  useEffect(() => {
    const updatedListItems = dragAndDropEditData.map((farmer) => {
      if (farmer.FarmerName) {
        return {
          id: `item-${farmer.id || 0}`,
          content: farmer.FarmerName || farmer.Name,
          FarmerCode: farmer.FarmerCode,
          Gender: farmer.Gender,
          MobileNo: farmer.MobileNo,
          StateName: farmer.StateName,
          DistrictName: farmer.DistrictName,
          LandArea: farmer.LandArea,
        };
      } else {
        return {
          id: `item-${farmer.id || 0}`,
          content: farmer.Name,
          BlockName: farmer.BlockName,
          createdAt: farmer.createdAt,
          FarmerCount: farmer.FarmerCount,
          FigLeaderContact: farmer.FigLeaderContact,
          FigLeader: farmer.FigLeader,
        };
      }
    });
    setData((prevData) => ({
      ...prevData,
      lists: {
        ...prevData.lists,
        "list-2": {
          ...prevData.lists["list-2"],
          items: updatedListItems,
        },
      },
    }));
  }, [dragAndDropEditData]);

  useEffect(() => {
    setFormListData(data?.lists["list-2"]?.items);
  }, [data]);

  const originalItems = data.lists["list-1"].items;

  const filteredItems = searchTerm
    ? originalItems.filter((item) =>
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : originalItems;

  const onDragEnd = (result) => {
    if (editedId && (status === "Pending" || status === "Approved")) {
      return;
    }

    const { destination, source } = result;

    if (!destination) return;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const startList = data.lists[source.droppableId];
    const finishList = data.lists[destination.droppableId];

    let startItems = Array.from(startList.items);
    let finishItems = Array.from(finishList.items);
    let movedItem;

    if (source.droppableId === "list-1") {
      movedItem = startItems.find(
        (item) => item.id === filteredItems[source.index].id
      );

      startItems = startItems.filter((item) => item.id !== movedItem.id);
    } else {
      movedItem = startItems[source.index];
      startItems.splice(source.index, 1);
    }

    finishItems.splice(destination.index, 0, movedItem);

    setData((prevData) => ({
      ...prevData,
      lists: {
        ...prevData.lists,
        [startList.id]: { ...startList, items: startItems },
        [finishList.id]: { ...finishList, items: finishItems },
      },
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container-drag-drop">
        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              margin: "5px 0",
              borderRadius: "5px",
              border: "1px solid #808080",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              fontSize: "16px",
            }}
          />
          {/* Droppable Lists */}
          <Droppable key={data.listOrder[0]} droppableId={data.listOrder[0]}>
            {(provided) => (
              <div
                className="list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="h3-drag-drop">
                  {data.lists[data.listOrder[0]].title}
                </h3>
                <div className="scrollable">
                  {filteredItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                      isDragDisabled={
                        !!editedId &&
                        (status === "Pending" || status === "Approved")
                      }
                    >
                      {(provided) => (
                        <div
                          className="item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>
        <Droppable key={data.listOrder[1]} droppableId={data.listOrder[1]}>
          {(provided) => (
            <div
              className="list"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ marginTop: "50px" }}
            >
              <h3 className="h3-drag-drop">
                {data.lists[data.listOrder[1]].title}
              </h3>
              <div className="scrollable">
                {data.lists[data.listOrder[1]].items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                    isDragDisabled={
                      !!editedId &&
                      (status === "Pending" || status === "Approved")
                    }
                  >
                    {(provided) => (
                      <div
                        className="item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default DragAndDropList;
