import React from "react";
import { useMutation } from "react-query";
import { MultiValue } from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";
import { TagDTO } from "src/api/dto/tag";
import TagService from "src/api/services/tag-service";
import styled from "styled-components";
import {
  CustomAsyncCreatableSelect,
  MultiSelectContainer,
} from "./MultiSelect.styles";

interface PropTypes {
  tags: TagDTO[];
  updateTags: (tags: TagDTO[]) => void;
}

interface Tag {
  id: number;
  name: string;
}

const MultiSelect: React.FC<PropTypes> = ({ tags, updateTags }) => {
  const components = {
    DropdownIndicator: null,
  };

  const searchTagsMutation = useMutation((query: string) => {
    return TagService.searchTags(query);
  });

  const getOptions = async (inputValue: string) => {
    const response = await searchTagsMutation.mutateAsync(inputValue);
    const options: TagDTO[] = response.data.map((tag: Tag) => {
      return { value: tag.name, label: tag.name };
    });

    return options;
  };

  const onChangeHandler = (newValue: any) => {
    updateTags(newValue.map((tag: TagDTO) => tag));
  };

  return (
    <MultiSelectContainer>
      <CustomAsyncCreatableSelect
        components={components}
        isMulti
        isClearable
        value={tags}
        onChange={onChangeHandler}
        loadOptions={getOptions}
        placeholder="Add tags"
        allowCreateWhileLoading
        classNamePrefix={"Select"}
      />
    </MultiSelectContainer>
  );
};

export default MultiSelect;
