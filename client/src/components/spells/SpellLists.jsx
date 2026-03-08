import { GET_ALL_SPELL_LISTS } from "../../utils/queries";
import {
  CREATE_SPELL_LIST,
  UPDATE_SPELL_LIST,
  DELETE_SPELL_LIST,
} from "../../utils/mutations";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { useEffect, useId } from "react";
import Spinner from "../Spinner";
import NamePlate from "../Nameplate";

export default function SpellLists() {
  const { userId } = useParams();

  const { loading, data } = useQuery(GET_ALL_SPELL_LISTS, {
    variables: { userId },
  });

  //   useEffect(() => {
  //     if (!loading && data) debugger;
  //   }, [data, loading]);

  if (loading) return <Spinner />;

  if (!loading && !data) return "No data found.";

  return (
    <div>
      {data.spellLists.map((list) => {
        return <NamePlate display={list.name} />
      })}
    </div>
  );
}
