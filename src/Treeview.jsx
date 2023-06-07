import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Modal from "./Modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import Editmodal from "./Editmodal";
import { data } from "./data";
import { toast } from "react-toastify";

export default function CustomizedTreeView() {
  const [open, setOpen] = useState();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [alldata, setAlldata] = useState(data);

  const close = () => {
    setOpen(false);
  };

  const edit = (editData) => {
    const edData = (ed) => {
      if (ed.id === id) {
        ed.name = editData;
        toast.success("Data updated successfully");
        setOpen(false);
      } else {
        ed?.children?.map((item) => edData(item));
      }
    };
    edData(alldata);
  };

  const Delete = (id) => {};

  const editdata = (id) => {
    setId(id.id);
    setName(id.name);
    setOpen(true);
  };

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={
        <FormControlLabel
          control={
            <Checkbox
              inputProps={{ "aria-label": "controlled" }}
              onClick={() => editdata(nodes)}
            />
          }
          label={nodes.name}
        ></FormControlLabel>
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 500, flexGrow: 1, maxWidth: 1500 }}
      >
        {renderTree(data)}
      </TreeView>
      <Modal data={data} />
      <Editmodal
        open={open}
        close={close}
        editdata={edit}
        name={name}
        setname={setName}
      />
    </>
  );
}
