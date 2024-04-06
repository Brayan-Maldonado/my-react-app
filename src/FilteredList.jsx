import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      type: "all"
    };
  }

  onSearch = (event) => {
    this.setState({ search: event.target.value.trim().toLowerCase() });
  }

  onFilter = (type) => {
    this.setState({ type });
  }

  filterItem = (item) => {
    const { search, type } = this.state;

    const matchesSearch = item.name.toLowerCase().includes(search);
    const matchesType = type === "all" || item.type.toLowerCase() === type.toLowerCase();

    return matchesSearch && matchesType;
  }

  render() {
    const { items } = this.props;
    const { type } = this.state;

    return (
      <div className="filter-list">
        <h1>Produce Search</h1>
        <DropdownButton id="typeDropdown" title={"Type"}>
          <Dropdown.Item eventKey="all" onSelect={() => this.onFilter("all")}>All</Dropdown.Item>
          <Dropdown.Item eventKey="Fruit" onSelect={() => this.onFilter("fruit")}>Fruit</Dropdown.Item>
          <Dropdown.Item eventKey="Vegetable" onSelect={() => this.onFilter("vegetable")}>Vegetable</Dropdown.Item>
        </DropdownButton>
        <input type="text" placeholder="Search" onChange={this.onSearch} />
        <List items={items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;
