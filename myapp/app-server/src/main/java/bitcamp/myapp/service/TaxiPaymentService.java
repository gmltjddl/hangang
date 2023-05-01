package bitcamp.myapp.service;

import java.util.List;
import bitcamp.myapp.vo.Payment;
import bitcamp.myapp.vo.TaxiPayment;

public interface TaxiPaymentService {
  void add(TaxiPayment taxipayment);
  List<Payment> list(String email);
  Payment get(String buyer_email);
}