import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import { useQuery } from "@apollo/client/react";
import { GET_ALL_SPELL_LISTS } from "../../utils/queries";

import { useNavigate } from "react-router-dom";

import Auth from "../../utils/auth";

import { useEffect, useState } from "react";

export default function SpellbookSidebar({ listSpells, defaultList }) {
  const [options, setOptions] = useState([]);
  const [selectedOpt, setSelectedOpt] = useState();
  const user = Auth.getUser();
  const navigate = useNavigate();

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
  }, [data, loading]);

  if (!user) return <></>;

  const Header = () => {
    return (
      <div>
        <div>
          <Button label="Edit Spells" />
          <Button label="View All Lists" />
        </div>

        <div>
          <Dropdown
            options={options}
            value={selectedOpt}
            onChange={(e) => {
              const listData = data.spellLists.find(
                (list) => list.name === e.value,
              );
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
