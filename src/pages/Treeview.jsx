import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Modal from "./Modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState,useEffect } from "react";
import Editmodal from "./Editmodal";
import { data } from "../data";
import { toast } from "react-toastify";

import { connect } from "react-redux";
import { fetch } from "../service/actions/action";

function CustomizedTreeView({ da, fetch }) {
  const [open, setOpen] = useState();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [checked, setChecked] = useState(false);
  const [alldata, setAlldata] = useState(data);

  const close = () => {
    setOpen(false);
    setChecked(false);
  };

  
  // ------------------------------ save data --------------------------------

  const save = (value) => {
    var id = Math.floor(Math.random() * 100 + 1).toString();
    let newdata = { id: id, name: value.item, children: [] };

    const adddata = (d) => {
      if (d.name === value.selectitem) {
        d.children?.push(newdata);
        toast.success("Data added successfully");
      } else {
        d.children?.map((item) => adddata(item));
      }
    };
    adddata(alldata);
  };

  // ------------------------------ Edit data --------------------------------

  const edit = (editData) => {
    const edData = (ed) => {
      if (ed.id === id) {
        ed.name = editData;
        toast.success("Data updated successfully");
        setOpen(false);
        setChecked(false);
      } else {
        ed?.children?.map((item) => edData(item));
      }
    };
    edData(alldata);
  };

  const editdata = (id) => {
    setId(id.id);
    setName(id.name);
    setOpen(true);
    setChecked(true);
  };

  // ------------------------------ Remove data --------------------------------

  const remove = () => {
    const deleteData = (id, removeData) => {
      if (removeData.id === id) {
        return null;
      }

      if (removeData.children && removeData.children.length > 0)
      {
        removeData.children = removeData.children.filter((child) =>
          deleteData(id, child)
        );
      }

      return removeData;
    };

    const updatedData = deleteData(id, alldata)
    setOpen(false);
  };

  // ------------------------------ Treeitems --------------------------------

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
              checked={checked}
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

  useEffect(() => {
    setAlldata(alldata);
  }, [alldata]);

  return (
    <>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 500, flexGrow: 1, maxWidth: 1500 }}
      >
        {renderTree(alldata)}
      </TreeView>

      <Modal save={save} />

      <Editmodal
        open={open}
        close={close}
        editdata={edit}
        name={name}
        setname={setName}
        delete={remove}
      />
    </>
  );
}

// ----------redux connect and set data to da

const mapState = (state) => ({
  da: state,
});

export default connect(mapState, { fetch })(CustomizedTreeView);
