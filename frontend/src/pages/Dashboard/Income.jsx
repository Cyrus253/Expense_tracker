import React, { useState ,useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import { API_PATH } from '../../utils/apiPath'
import axiosInstance from '../../utils/axiosInstance'
import Model from '../../components/Model'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import { toast } from 'react-hot-toast'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'

const Income = () => {
   useUserAuth()

  const[incomeData, setIncomeData] = useState([])
  const[loading, setLoading] = useState(false)
  const[openDeleteAlert, setOpenDeleteAlert] = useState({
    show:false,
    data:null
  })
  const [openAddIncomeModal , setOpenAddIncomeModal] = useState(false)

  //get all income details
  const fetchIncomeDetails = async () => {
      if(loading) return;

      setLoading(true)

      try {
        const response = await axiosInstance.get(`${API_PATH.INCOME.GET_ALL_INCOME}`)

        if(response.data){
          setIncomeData(response.data)
        }
      } catch (error) {
        console.log("error while fetching income data", error)

      } finally {
        setLoading(false)
      }
    }

  // handling add income 
  const handleAddIncome = async (income) => {
    const {source, amount, date, icon} = income

    //validation check
    if(!source.trim()){
      toast.error("Source is required")
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
      await axiosInstance.post(`${API_PATH.INCOME.ADD_INCOME}`, {
        source,
        amount,
        date,
        icon
      })
      setOpenAddIncomeModal(false)
      toast.success("Income added successfully")
      fetchIncomeDetails()

    } catch (error) {
      console.error(
        "error while adding income",
        error.response?.data?.message || error.message
      )
    }
  }

  //delete income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATH.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({
        show:false,
        data:null
      })
      toast.success("Income deleted successfully")
      fetchIncomeDetails()
    } catch (error) {
      console.log("error while deleting income", 
        error.response?.data?.message || error.message 
      )
    }
  }

  // Fetch data on component mount
     useEffect(() => {
      fetchIncomeDetails();

      return () => {}
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className=''>
          <div className=''>
            <IncomeOverview 
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList 
          transactions={incomeData}
          onDelete={(id) =>{
            setOpenDeleteAlert({
              show:true,
              data:id 
            })
          }}
         />
          
        </div>

        <Model 
         isOpen={openAddIncomeModal}
         onClose={() => setOpenAddIncomeModal(false)}
         title="Add Income"
         >

         <AddIncomeForm onAddIncome={handleAddIncome} />
        </Model>

        <Model
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({
          show:false,
          data:null
        })}
        title="Delete Income"
        >
         <DeleteAlert 
          content="Are you sure you want to delete this income?"
          onDelete={() => deleteIncome(openDeleteAlert.data)}
        />
        </Model>
      </div>
    </DashboardLayout>
  )
}

export default Income