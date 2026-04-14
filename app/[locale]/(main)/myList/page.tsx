"use client";

import MyListCard from "../components/MyListCard";
import useMyList from "../contexts/MyListItems";

const page = () => {
  const { myList } = useMyList();

  return (
    <main className="px-6 md:px-12 pt-28 mb-20">
      {/* <!-- Header Section --> */}
      <header className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
        <div>
          <span className="block text-primary text-xs tracking-[0.2em] uppercase mb-2">
            Personal Collection
          </span>
          <h2 className="text-on-surface font-extrabold text-5xl md:text-6xl tracking-tight">
            My List
          </h2>
        </div>
        {/* <!-- Filters --> */}
        {/* <div className="flex items-center bg-surface-container-low p-1.5 rounded-full border border-outline-variant/20 shadow-inner">
          <button className="px-6 py-2 rounded-full bg-primary text-on-primary font-bold text-sm transition-all duration-300">
            Want to Watch
          </button>
          <button className="px-6 py-2 rounded-full text-on-surface-variant hover:text-on-surface font-medium text-sm transition-all duration-300">
            Watched
          </button>
        </div> */}
      </header>
      {/* <!-- Bento-Style Grid --> */}

      {/* <!-- Movie Card 1 --> */}
      {myList.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {myList.map((item, i) => (
            <MyListCard
              id={item.id}
              title={item.title}
              body={item.body}
              type={item.type}
              actors={item.actors}
              year={item.year}
              imgSrc={item.imgSrc}
              key={i}
            />
          ))}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 rounded-xl aspect-[2/3] hover:border-primary/50 transition-colors duration-300 group cursor-pointer bg-surface-container-low/30">
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-4 group-hover:bg-primary-container transition-colors duration-300">
              <span
                className="material-symbols-outlined text-primary group-hover:text-on-primary-container"
                data-icon="add"
              >
                add
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-outline">
              Browse Archive
            </p>
          </div>
        </section>
      ) : (
        <div className="text-4xl font-bold w-full text-center">
          There are no items in your list.
        </div>
      )}
    </main>
  );
};

export default page;
