import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { API_PATH } from '../../utils/apiPath'
import axiosInstance from '../../utils/axiosInstance'
import toast from 'react-hot-toast'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import Model from '../../components/Model'
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert'

const Expense = () => {
     useUserAuth()
    
      const[expenseData, setExpenseData] = useState([])
      const[loading, setLoading] = useState(false)
      const[openDeleteAlert, setOpenDeleteAlert] = useState({
        show:false,
        data:null
      })
      const [openAddExpenseModal , setOpenAddExpenseModal] = useState(false)

 //get all Expense details
  const fetchExpenseDetails = async () => {
      if(loading) return;

      setLoading(true)

      try {
        const response = await axiosInstance.get(`${API_PATH.EXPENSE.GET_ALL_EXPENSE}`)

        if(response.data){
          setExpenseData(response.data)
        }
      } catch (error) {
        console.log("error while fetching income data", error)

      } finally {
        setLoading(false)
      }
    }

  // handling Add Expense  
  const handleAddExpense = async (expense) => {
    const {category, amount, date, icon} = expense

    //validation check
    if(!category.trim()){
      toast.error("category is required")
      return;
    }
    if(!amount || isNaN(amount) || amount <= 0){
      toast.error("Amount should valid and be greater than 0")
      return
    }
    if(!date){
      toast.error("Date is required")
      return;
    }

    try {
      await axiosInstance.post(`${API_PATH.EXPENSE.ADD_EXPENSE}`, {
        category,
        amount,
        date,
        icon
      })
      setOpenAddExpenseModal(false)
      toast.success("Expense added successfully")
      fetchExpenseDetails()

    } catch (error) {
      console.error(
        "error while adding expense",
        error.response?.data?.message || error.message
      )
    }
  } 

    //delete Expense
 const deleteExpense = async (id) => {
      try {
        await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(id))
  
        setOpenDeleteAlert({
          show:false,
          data:null
        })
        toast.success("Expense deleted successfully")
        fetchExpenseDetails()
      } catch (error) {
        console.log("error while deleting Expense", 
          error.response?.data?.message || error.message 
        )
      }
    }
  
  useEffect(() => {
    fetchExpenseDetails()
  
    return () => {}
  }, [])
  

  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className=''>
          <div className=''>
            <ExpenseOverview 
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>

            <ExpenseList 
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show:true,
                data:id
              })
            }}
            />
         
        </div>

        <Model 
         isOpen={openAddExpenseModal} 
         onClose={() => setOpenAddExpenseModal(false)}
         title="Add Expense"
         >

          <AddExpenseForm 
           onAddExpense={handleAddExpense}
         />
        </Model>

        <Model
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({
          show:false,
          data:null
        })}
        title="Delete Expense"
        >
         <DeleteAlert 
          content="Are you sure you want to delete this Expense?"
          onDelete={() => deleteExpense(openDeleteAlert.data)}
        />
        </Model>
     </div>   
    </DashboardLayout>
  )
}

export default Expense