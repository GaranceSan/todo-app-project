import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getLists(query) {
  await fakeNetwork(`getLists:${query}`);
  let lists = await localforage.getItem("lists");
  if (!lists) lists = [];
  if (query) {
    lists = matchSorter(lists, query, { keys: ["title"] });
  }
  return lists.sort(sortBy("created"));
}
