import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ALL_SPELL_LISTS } from "../../utils/queries";
import { UPDATE_SPELL_LIST } from "../../utils/mutations";

import { useNavigate } from "react-router-dom";

import Auth from "../../utils/auth";

import { useEffect, useState } from "react";

export default function SpellbookSidebar({
  listSpells,
  defaultList,
  showCheckboxes,
  setShowCheckboxes,
  checkedSpells,
  setCheckedSpells,
  allSpells,
  setListSpells,
  setSpells,
}) {
  const [options, setOptions] = useState([]);
  const [selectedOpt, setSelectedOpt] = useState();
  const [listData, setListData] = useState({});
  const user = Auth.getUser();
  const navigate = useNavigate();

  const [updateSpellList] = useMutation(UPDATE_SPELL_LIST);

  const { loading, data } = useQuery(GET_ALL_SPELL_LISTS, {
    variables: { userId: user?.data._id },
  });

  useEffect(() => {
    if (!data) return;

    const names = data.spellLists.map((list) => list.name);
    setOptions(names);

    if (!defaultList) return;

    const defaultOpt = data.spellLists.find((list) => list._id === defaultList);
    setSelectedOpt(defaultOpt.name);
    setListData(defaultOpt);
  }, [data, loading]);

  if (!user) return <></>;

  const handleUpdateSpellList = async () => {
    await updateSpellList({
      variables: {
        listId: listData._id,
        spells: checkedSpells,
      },
    });

    setShowCheckboxes(false);
  };

  const Header = () => {
    return (
      <div>
        <div>
          {showCheckboxes && (
            <Button
              label="Save Changes"
              onClick={async () => {
                await handleUpdateSpellList();
              }}
            />
          )}

          <Button
            label="Edit Spells"
            onClick={() => {
              if (showCheckboxes) {
                setSpells(listSpells);
                setCheckedSpells([]);
              } else {
                const newCheckedSpells = listSpells.map((spell) => spell._id);
                setCheckedSpells(newCheckedSpells);
                setSpells(allSpells);
              }

              setShowCheckboxes((prev) => !prev);
            }}
          />

          <Button
            label="View All Lists"
            onClick={() => navigate(`/spellLists/${user.data._id}`)}
          />
        </div>

        <div>
          <Dropdown
            options={options}
            value={selectedOpt}
            onChange={(e) => {
              const listData = data.spellLists.find(
                (list) => list.name === e.value,
              );
              if (showCheckboxes) setShowCheckboxes(false);
              setSelectedOpt(e.value);
              navigate(`/spells/${listData._id}`);
            }}
          />
          <Button icon="pi pi-pencil" />
        </div>
      </div>
    );
  };

  return <Card header={Header} />;
}
