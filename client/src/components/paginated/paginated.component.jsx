// import "./paginated.style.css";

// function Paginated({ currentPage, totalPages, onPageChange }) {
//   const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

//   return (
//     <div className="pagination">
//       {pageNumbers.map((page) => (
//         <span
//           key={page}
//           className={currentPage === page ? "active" : ""}
//           onClick={() => onPageChange(page)}
//         >
//           {page}
//         </span>
//       ))}
//     </div>
//   );
// }

// export default Paginated;

// import "./paginated.stylecss";

// function Paginated({Page, totalPages onPageChange })
//   const pageNumbers = Array.({ length: totalPages }, (_, index) => index 1);

//   return (
//     <div className="ination">
//       <span onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
//         Previous
//       </span>
//       {pageNumbers.map((page) => (
//         <span
//           key={page}
//           className={currentPage === page ? "active" : ""}
//           onClick={() => onPageChange(page)}
//         >
//           {page}
//         </span>
//       ))}
//       <span onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//         Next
//       </span>
//     </div>
//   );
// }