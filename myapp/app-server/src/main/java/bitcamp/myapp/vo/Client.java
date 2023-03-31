package bitcamp.myapp.vo;

import java.util.List;
import lombok.Data;

@Data
public class Client extends Member{
  private String nickName;
  private String introduce;
  private String hobby;
  private List<ClientFile> attachedFiles;
  private String interest;
}