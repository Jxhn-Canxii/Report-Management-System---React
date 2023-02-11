/** @format */
import React, { useState } from "react";
import { InputGroup,Input } from "reactstrap";

const FilterComponent = (props) => {
  return (
    <InputGroup>
        <Input type="search" placeholder="Filter Item"></Input>
    </InputGroup>
  );
};
export default FilterComponent;
