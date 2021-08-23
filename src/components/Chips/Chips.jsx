import { Chip } from "@material-ui/core";
import { useEffect } from "react";
import useAxios from "../../customHooks/useAxios";
import requestApiCalls from "../../Adapters/api";

const Chips = ({
  type,
  setPage,
  selectedChips,
  setSelectedChips,
  chips,
  setChips,
  setNumOfPages,
}) => {
  const { fetchData } = useAxios();

  const addChipItemHandler = (chip) => {
    setSelectedChips([...selectedChips, chip]);
    setChips(chips.filter((c) => c.id !== chip.id));
    setPage(1);
    setNumOfPages(1);
  };

  const removeSelectedChipItemHandler = (chip) => {
    setChips([...chips, chip]);
    setSelectedChips(
      selectedChips.filter((selected) => selected.id !== chip.id)
    );
    setPage(1);
    setNumOfPages(1);
  };

  useEffect(() => {
    const applyData = (response) => {
      setChips(response.genres);
    };

    fetchData(requestApiCalls.fetchChipsData.bind(null, type), applyData);
    return () => {
      setChips([]); //unmounting
      setSelectedChips([]); //unmounting
    };
  }, [fetchData, setChips, type, setSelectedChips]);

  return (
    <div style={{ padding: "6px 0px" }}>
      {selectedChips &&
        selectedChips.map((chip) => (
          <Chip
            label={chip.name}
            style={{ margin: 4 }}
            clickable
            key={chip.id}
            size="medium"
            color="primary"
            onDelete={() => removeSelectedChipItemHandler(chip)}
          />
        ))}
      {chips &&
        chips.map((chip) => (
          <Chip
            label={chip.name}
            style={{ margin: 4 }}
            clickable
            key={chip.id}
            size="medium"
            onClick={() => addChipItemHandler(chip)}
          />
        ))}
    </div>
  );
};

export default Chips;
