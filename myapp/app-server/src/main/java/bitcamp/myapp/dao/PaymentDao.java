package bitcamp.myapp.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import bitcamp.myapp.vo.Payment;

@Mapper
public interface PaymentDao {
  void insert(Payment payment);
  List<Payment> findAll(String keyword);
  List<Payment> seatlist();
  Payment findByNo(String buyer_email);
}