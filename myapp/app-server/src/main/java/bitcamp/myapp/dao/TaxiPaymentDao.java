package bitcamp.myapp.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.Payment;
import bitcamp.myapp.vo.TaxiPayment;

@Mapper
public interface TaxiPaymentDao {
  void insert(TaxiPayment taxipayment);
  List<Payment> findAll();
  Payment findByNo(String buyer_email);
}