// import { useEffect, useState, useRef } from "react";
// import { useMutation, useQuery } from "@apollo/client";
// import {
//   GET_ALL_SPELLS,
//   GET_ALL_SPELL_LISTS,
// } from "../../utils/queries";
// import { CREATE_SPELL_LIST } from "../../utils/mutations";
// // import { Spinner, Button } from "react-bootstrap";
// import SpellCard from "./SpellCard";
// import FilterSelect from "./FilterSelect";
// import Filters from "./Filters";
// import SpellListSidebar from "./SpellListSidebar";
// import InputModal from "../Modals/InputModal";
// import AccountModal from "../Modals/AccountModal";
import Auth from "../../utils/auth";
// import "./Spells.css";
import { sortByName } from "../../utils/lib";

import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_ALL_SPELLS, GET_SPELL_LIST_BY_ID } from "../../utils/queries";
import { useQuery } from "@apollo/client/react";

import Spinner from "../Spinner";
import SpellCard from "./SpellCard";
import SpellFilters from "./SpellFilters";
import SpellToolbar from "./SpellToolbar";
import SpellbookSidebar from "./SpellbookSidebar";

import "./Spells.css";

export default function Spells() {
  const [spells, setSpells] = useState([]);
  const [listSpells, setListSpells] = useState([]);
  const [allSpells, setAllSpells] = useState([]);
  const [filters, setFilters] = useState({});
  const [displayedFilters, setDisplayedFilters] = useState([]);
  const [reload, setReload] = useState(0);

  const [searchParams] = useSearchParams();
  const spellid = searchParams.get("spellid");
  const userid = searchParams.get("userid");
  const { listid } = useParams();
  const navigate = useNavigate();

  const { loading: allSpellsLoading, data: allSpellsData } =
    useQuery(GET_ALL_SPELLS);

  const { loading: spellListLoading, data: spellListData } = useQuery(
    GET_SPELL_LIST_BY_ID,
    { variables: { id: listid } },
  );

  useEffect(() => {
    if (allSpellsLoading || !allSpellsData) return;
    let spells = allSpellsData.spells;
    const sortedSpells = sortByName([...spells]);
    setAllSpells(sortedSpells);

    // if (listid && !spellListData) return;
    if (listid) {
      if (!spellListData) return;
      else {
        // const listSpells = sortedSpells.filter((spell) => )
        console.log(spellListData);
        const listSpells = spellListData.spellListById.spell;
        const filteredSpells = sortedSpells.filter((spell) =>
          listSpells.some((listSpell) => listSpell._id === spell._id),
        );
        setListSpells(filteredSpells);
        setSpells(filteredSpells);
      }
    } else setSpells(sortedSpells);
  }, [allSpellsData, allSpellsLoading, spellListLoading, spellListData]);

  if (allSpellsLoading) return <Spinner />;

  const getSpellCard = () => {
    if (!spells.length) return null;
    const selectedSpell = spells.find((s) => s._id === spellid);
    return <SpellCard spell={selectedSpell} />;
  };

  const filterVars = {
    filters,
    setFilters,
    displayedFilters,
    setDisplayedFilters,
  };

  return (
    <div className="d-flex">
      <div className="spell-list-div">
        <SpellToolbar {...filterVars} />
        <SpellFilters
          key={allSpells}
          allSpells={allSpells}
          spells={spells}
          listSpells={listSpells}
          setSpells={setSpells}
          {...filterVars}
        />
        {spellid && getSpellCard()}

        <ul className="spell-list">
          {spells.map((spell, idx) => (
            <li className="spell-name py-1 px-2 col-lg-3 col-sm-4 col-md-3">
              <span
                onClick={() =>
                  navigate(`/spells?spellid=${spell._id}`, {
                    replace: !!spellid,
                  })
                }
                className="nav-div"
              >
                {spell.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="d-flex px-3">
        <SpellbookSidebar listSpells={listSpells} defaultList={listid} />
      </div>
    </div>
  );
}
