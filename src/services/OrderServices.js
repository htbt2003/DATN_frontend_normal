import httpAxios from "../httpAxios";


function getAll(page)
{
    return httpAxios.get(`order/index?page=${page}`);
}
function getById(id)
{
    return httpAxios.get("order/show/" + id);
}
function create(data)
{
    return httpAxios.post("order/store", data);
}
function update(data, id)
{
    return httpAxios.post("order/update/" + id, data);
}
function remove(id)
{
    return httpAxios.delete("order/destroy/" + id);
}
function getOrderByUserId(user_id)
{
    return httpAxios.get(`order_userId/${user_id}`);
}
function doCheckout(data)
{
    return httpAxios.post("doCheckout", data);
}

const OrderService = {
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    getOrderByUserId:getOrderByUserId,
    doCheckout:doCheckout,
    changeStatus:(id) =>
    {
        return httpAxios.get("order/change_status/" + id);
    },
    cancel_order:(id) =>
    {
        return httpAxios.get("cancel_order/" + id);
    },
    restore:(id) =>
    {
        return httpAxios.get("order/restore/" + id);
    },
    trash:(page) =>
    {
        return httpAxios.get(`order/trash?page=${page}`);
    },
    orderDetail:(order_id) =>
    {
        return httpAxios.get("orderDetail/" + order_id);
    },
    getUSDRate:() =>
    {
        return httpAxios.get("getUSDRate");
    },
}
export default OrderService;