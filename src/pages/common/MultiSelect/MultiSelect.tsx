import React from "react";
import { MultiValue } from "react-select";
import { TagDTO } from "src/api/dto/image";
import TagService from "src/api/services/tag-service";
import AsyncCreatableSelect from "react-select/async-creatable";
import { MultiSelectContainer } from "./MultiSelect.styles";
import { useMutation } from "react-query";

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
  }

  const searchTagsMutation = useMutation((query: string) => {
    return TagService.searchTags(query);
  });

  const getOptions = async (inputValue: string) => {
    const response = await searchTagsMutation.mutateAsync(inputValue);
    const options: TagDTO[] = response.data.map((tag: Tag) => {
      return { value: tag.id, label: tag.name };
    });

    return options;
  };

  const onCHangeHandler = (newValue: MultiValue<TagDTO>) => {
    updateTags(newValue.map((tag: TagDTO) => tag));
  };

  return (
    <MultiSelectContainer>
      <AsyncCreatableSelect
        components={components}
        isMulti
        isClearable
        value={tags}
        onChange={onCHangeHandler}
        loadOptions={getOptions}
        placeholder="Add tags"
        allowCreateWhileLoading
      />
    </MultiSelectContainer>
  );
};

export default MultiSelect;
