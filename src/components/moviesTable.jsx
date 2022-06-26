import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class FilesTable extends Component {
  columns = [
    {
      key: "checkBox",
      content: file => (
        <Like liked={file.liked} onClick={() => this.props.onLike(file)} />
      )
    },
    {
      path: "title",
      label: "Title",
      content: file => <Link to={`/files/${file._id}`}>{file.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "delete",
      content: file => (
        <button
          onClick={() => this.props.onDelete(file)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { files, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={files}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default filesTable;
