pragma solidity ^0.4.11;

contract UnitManager {

  enum Status { Pending, Active, Transit, Dispensed }
  enum Role { None,Infrastructure, Server, Packager, Distributor, Dispensary }

  struct Unit {
    bytes32 idHash;
    Status  unitStatus;
    address custodian;
    bytes32 recHash;
    bool exists;
  }

  event LogEvent(
      string eventType,
      bytes32 indexed _idHash,
      address initiator
  );

  bytes32[] public hashArray;
  mapping(address=>address[]) public users;
  mapping(bytes32=>Unit) public units;
  mapping(address=>Role) public userRole;

  function UnitManager() {
    userRole[msg.sender] = Role.Server;
  }

  function hashArrayLength() constant public returns (uint){
    return hashArray.length;
  }

  function getHashArray(uint index) constant public returns (bytes32){
    return hashArray[index];
  }

  function commissionUnit(bytes32 uid) public {
    if(getRole(msg.sender) == uint(Role.Packager))
    {
      units[uid].exists = true;
      units[uid].idHash = uid;
      units[uid].custodian = msg.sender;
      units[uid].unitStatus = Status.Pending;
      hashArray.push(uid);
        LogEvent("commissioning", uid, units[uid].custodian);
    }
  }

  function unitExists(bytes32 uid) public constant returns (bool) {
     return units[uid].exists;
  }

  function unitStat(bytes32 uid) public constant returns (uint) {
     return uint(units[uid].unitStatus);
  }

  function shipUnit(bytes32 uid) public {
    if(units[uid].unitStatus == Status.Active && units[uid].custodian == msg.sender) {
      if(userRole[msg.sender] != Role.None && userRole[msg.sender] != Role.Dispensary) {
        units[uid].unitStatus = Status.Transit;
        LogEvent("shipping", uid, units[uid].custodian);
      }
    }
  }

  function receiveUnit(bytes32 uid) public {
  if(units[uid].unitStatus == Status.Transit && userRole[msg.sender] != Role.None && userRole[msg.sender] != Role.Infrastructure) {
      units[uid].unitStatus = Status.Active;
      units[uid].custodian = msg.sender;
      LogEvent("receiving", uid, msg.sender);
    }
  }

  function dispenseUnit(bytes32 uid) public {
    if(units[uid].unitStatus == Status.Active && userRole[msg.sender] == Role.Dispensary && units[uid].custodian == msg.sender) {
      units[uid].unitStatus = Status.Dispensed;
      LogEvent("dispensing", uid, msg.sender);
    }
  }

  function setRole(address user,uint number) public {
    if(userRole[msg.sender] == Role.Server) {
      if(number >= uint(Role.None) && number <= uint(Role.Dispensary)) {
        userRole[user] = Role(number);
        users[msg.sender].push(user);
      }
    }
  }

  function getHash(string a, string b,string c, string d) public constant returns(bytes32){
    return keccak256(a,b,c,d);
  }

  function getRole(address a) public constant returns (uint) {
    return uint(userRole[a]);
  }








}
