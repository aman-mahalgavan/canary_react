pragma solidity ^ 0.4.25;


contract campaignCreator{
    address[] public campaigns;
    
    event DeployedCampaignAddress(address _campaign);
    
    function createCampaign(uint _deadline,uint _goal,uint _minimum) public  {
        address newCampaign = new FundRaising(_deadline,_goal,msg.sender,_minimum);
        campaigns.push(newCampaign);
        emit DeployedCampaignAddress(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns(address[]){
        return campaigns;
    }
}



contract FundRaising {
    
    mapping(address=>uint) public contributions;
    uint public totalContributors;
    uint public minimumContribution;
    uint public deadline;
    uint public goal;
    uint public raisedAmount = 0 ;
    address public admin;
    
    struct  Request  {
        string description;
        uint value;
        address recipient;
        bool completed;
        uint numberOfVoters;
        mapping(address=>bool) voters;
    }
    Request[] public requests;
    
    constructor(uint _deadline,uint _goal,address owner,uint _minimum) public{
        minimumContribution = _minimum;
        deadline=block.number + _deadline;
        goal=_goal;
        admin = owner;
    }
    
    modifier onlyAdmin {
        require(msg.sender == admin);
        _;
    }

    modifier reachedGoal {
        require(raisedAmount >= goal);
        _;
    }
    
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        require(block.number < deadline);
        
        if(contributions[msg.sender] == 0)
        {
            totalContributors++;
        }
        
        contributions[msg.sender] += msg.value;
        raisedAmount+=msg.value;
    }
    
    function getBalance() public view returns(uint)
    {
        return address(this).balance;
    }
    
    function getRefund() public {
        require(block.number > deadline);
        require(raisedAmount < goal);
        require(contributions[msg.sender] > 0);
        
        
        msg.sender.transfer(contributions[msg.sender]);
        contributions[msg.sender] = 0;
       
    }
    
    function createSpendingRequest(string _description, address _recipient, uint _value) public onlyAdmin reachedGoal{
        
        Request memory newRequest = Request(
            {
                description:_description,
                value:_value,
                recipient:_recipient,
                numberOfVoters:0,
                completed:false
                }
            );
        
        requests.push(newRequest);
        
        
    }
    
    function getSummary() public view returns (
      uint, uint, uint, uint, address,uint,uint
      ) {
        return (
          minimumContribution,
          address(this).balance,
          requests.length,
          totalContributors,
          admin,
          deadline,
          goal
        );
    }
   
   function isContributor(address user) public view returns(bool){
       if(contributions[user] > 0){
           return true;
       }
       else{
        return false;
           
       
       }
   }
   
   function hasVoted(uint index,address user) public view returns(bool){
       Request storage thisRequest = requests[index];
       return thisRequest.voters[user];
   }
   
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
    
    function approveRequest(uint index) public reachedGoal{
        Request storage thisRequest = requests[index];
        require(contributions[msg.sender] > 0);
        require(thisRequest.voters[msg.sender] == false);
        
        thisRequest.voters[msg.sender] = true;
        thisRequest.numberOfVoters++;
    }
    
    function makePayment(uint index) public onlyAdmin reachedGoal {
        Request storage thisRequest = requests[index];
        require(thisRequest.completed == false);
         require(thisRequest.numberOfVoters > totalContributors / 2);//more than 50% voted
        thisRequest.recipient.transfer(thisRequest.value);
        thisRequest.completed = true;
    }
}