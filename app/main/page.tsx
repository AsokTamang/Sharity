import Link from "next/link"
export default function Main(){
 return(
  <>
   <div className="w-full flex flex-row justify-between mt-1">
     <div className="p-6 bg-amber-100 rounded-2xl hover:bg-amber-300">
     
    <Link  href={'/additem'}>
    <span className="font-semibold text-md">Post an Item for Sharing</span></Link>
    </div>
    <div className="p-6 bg-amber-100 rounded-2xl hover:bg-amber-300">
    <Link href={'/seeitems'}>
     <span className="font-semibold text-md">Browse Shared Items Available</span></Link>
    </div>

  </div>
  <main className='flex flex-col items-center justify-center mt-36 p-28  bg-amber-200 '>
    <h1 className="italic">Welcome to our sharity community,</h1>
    <h2 className="italic">  Join millions of people in a shared mission—free up space by passing along unused items to those who need them. Together, we turn what’s no longer useful to one into something meaningful for another. </h2>
  </main>
 
  
  </>)



}