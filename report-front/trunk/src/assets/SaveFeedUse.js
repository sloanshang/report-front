function FrMsSwineMaterial(orgCode,farmOrg,values,product,documentExt,startDate) {
    this.modelState = null ;
    this.orgCode = orgCode ;             //需要传值
    this.period ;
    this.projectCode ;
    this.farmOrg = farmOrg ;            //需要传值
    this.stockType = 10 ;               // 需要传值，  api上面标标记为null 
    this.transactionDate = startDate ;  //需要传值
    this.documentType ;
    this.documentNo ;
    this.documentExt = documentExt; // 需要传值
    this.refDocumentNo ;
    this.projectStockOrg  ;
    this.stockOrg  ;
    this.productCode = product.productCode ;    //需要传值
    this.productSpec ;
    this.gradeCode = product.gradeCode ;        //需要传值
    this.lotNo = "00";                                           // 需要传值，api上面标记的为null
    this.transactionType = null  ;
    this.transactionCode = null ;
    this.qty = product.qty ;            //需要传值
    this.wgh = product.wgh ;             // 需要传值
    this.val = null ;
    this.cost = null ;
    this.cancelFlag = null;
    this.cancelDate = null ;
    this.userCreate = null ;
    this.createDate = null ;
    this.lastUserId = null ;
    this.lastUpdateDate = null ;
    this.lastFunction = null ;
    this.farmOrgLocation = values.pageData.locationId ;                    //需要传值，api上面标记为null
    this.desFarmOrg = null ;
}
export  {
    FrMsSwineMaterial
}