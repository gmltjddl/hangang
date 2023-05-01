package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.Payment;

public interface PaymentService {
  void add(Payment payment);
  List<Payment> list(String email);
  List<Payment> seatlist();
  Payment get(String buyer_email);
}