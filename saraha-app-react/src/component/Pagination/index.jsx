import _ from 'lodash'
import React from 'react'

export default function Pagination({users,changePage,pageNumber,pageSize}) {
   let pages=Math.ceil(users.length/pageSize)
    if(pages==1)return
   let pagesCount= _.range(0, pages)

  return (
    <div><nav aria-label="Page navigation example">
    <ul class="pagination">
        {pagesCount.map(page =>{
        return(
              <li className="page-item" onClick={()=>changePage(page)}>
                <a className={page===pageNumber ? "page-link active ":"page-link"} >{page+1}</a>
                </li>
        )
    

        }

        )}

   
    </ul>
  </nav></div>
  )
}
