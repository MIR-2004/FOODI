import { useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'

const useCart = () => {

    const {user, loading} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const {refetch,data:cart = []} = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`)
            return res.data;
          },
        enabled: !loading && !!user?.email,
    })
  return[ cart, refetch]
}

export default useCart
