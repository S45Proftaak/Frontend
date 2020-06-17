import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Card, Container } from "react-bootstrap";
import "./CSS/OverviewStyle.css";
import { compose } from "redux";
import { connect } from "react-redux";
import "../CSS/Default.css";

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import '../../../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.css';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {t} = this.props;

    function priceFormatter(column, colIndex, { sortElement, filterElement }) {
      return (
        <div style={ { flexDirection: 'collum' } }>
          { filterElement }
          {column.text} {sortElement}
        </div>
      );
    }

    const columns = [
      {
        dataField: 'id',
        text:'id',
        sort: true,
        sortCaret: (order, column) => {
          if (!order) return (<span>&nbsp;&nbsp;&#x2193;/&#x2191;</span>);
          else if (order === 'asc') return (<span>&nbsp;&nbsp;&#x2193;/<font color="lightgreen">&#x2191;</font></span>);
          else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="lightgreen">&#x2193;</font>/&#x2191;</span>);
          return null;},
          hidden:true
      }, {
      dataField: 'name',
      text: t("AdministratieOverview.name"),
      sort: true,
      filter: textFilter({
        placeholder:t("AdministratieOverview.defaultvalue")
      }),
      headerFormatter: priceFormatter,
      sortCaret: (order, column) => {
        if (!order) return (<span>&nbsp;&nbsp;&#x2191;/&#x2193;</span>);
        else if (order === 'asc') return (<span>&nbsp;&nbsp;&#x2191;/<font color="lightgreen">&#x2193;</font></span>);
        else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="lightgreen">&#x2191;</font>/&#x2193;</span>);
        return null;}
    }, {
      dataField: 'date',
      text:t("AdministratieOverview.date"),
      sort: true,
      sortCaret: (order, column) => {
        if (!order) return (<span>&nbsp;&nbsp;&#x2191;/&#x2193;</span>);
        else if (order === 'asc') return (<span>&nbsp;&nbsp;&#x2191;/<font color="lightgreen">&#x2193;</font></span>);
        else if (order === 'desc') return (<span>&nbsp;&nbsp;<font color="lightgreen">&#x2191;</font>/&#x2193;</span>);
        return null;}
    },{
      dataField: 'intime',
      text: t("AdministratieOverview.intime")
    }];

    const defaultSorted = [{
      dataField: 'id',
      order: 'asc'
    }];

    function FormatPayload(props) {
      if(props.payload !== undefined)
      {
          let returnable = [];

          props.payload.map((item,key) => {
            let model = {
              id: key,
              date: item.date,
              name: item.name,
              intime: !item.toLate ? <p>&#10003;</p> : <p>&#10005;</p>
          }
          returnable.push(model);
        });

        return returnable;
      }else {
        return [];
      }
    }

    return (
      <Card className="HeightContainer">
        <Card.Body className="DefaultCardLayer1">
          <BootstrapTable keyField='id' data={ FormatPayload(this.props) } columns={ columns } defaultSorted={ defaultSorted } filter={ filterFactory() }  bordered={ true } striped hover condensed/>
        </Card.Body>
      </Card>
    );
  }
}

const MyComponent = compose(
  withTranslation(),
  connect((state) => {
    return {
      payload: state.AdminOvervieuw.payload,
    };
  })
)(Overview);

// i18n translations might still be loaded by the xhr backend
// use react's Suspense
export default function App() {
  return (
    <React.Suspense fallback="loading">
      <MyComponent />
    </React.Suspense>
  );
}
